import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMutation, useSubscription } from '@apollo/client'
import { Loading } from '../components/Loading'
import { QUESTION } from '../graphql/subscriptions'
import { NEW_VOTE } from '../graphql/mutations'

export const Question = () => {
  const { id } = useParams()
  const [sendVote, { called: isVoted, loading: voteLoading }] = useMutation(NEW_VOTE)
  const { data, error, loading } = useSubscription(QUESTION, { variables: { id } })

  const [selectedOptionId, setSelectedOptionId] = useState()
  const [totalVoteCount, setTotalVoteCount] = useState(0)

  useEffect(() => {
    if (data?.questions_by_pk?.options) {
      const total = data.questions_by_pk.options.reduce((total, option) =>
        total + option.votes_aggregate.aggregate.count, 0)
      setTotalVoteCount(total)
    }
  }, [data])

  if (error) return <span>{error.message}</span>
  if (loading) return <Loading />

  const handleOptionChange = (event) => {
    setSelectedOptionId(event.target.value)
  }

  const handleVoteClick = async () => {
    await sendVote({
      variables: {
        input: {
          option_id: selectedOptionId
        }
      }
    })
  }

  return (
    <div style={styles.container}>
      <h2>{data?.questions_by_pk.title}</h2>
      {data?.questions_by_pk.options.map((option) => (
        <label key={option.id} htmlFor={option.id} style={styles.optionContainer}>
          {!isVoted && (
            <input
              type='radio'
              id={option.id}
              name='options'
              value={option.id}
              onChange={handleOptionChange}
            />
          )}
          <span>{option.title} {isVoted && `(${option.votes_aggregate.aggregate.count})`}</span>
          {isVoted && (
            <span>
              <progress
                value={option.votes_aggregate.aggregate.count}
                max={totalVoteCount}
                style={styles.optionProgress}
              />
              (%{Number(option.votes_aggregate.aggregate.count / totalVoteCount * 100).toFixed(2) || '0.00'})
            </span>
          )}
        </label>
      ))}

      {!isVoted && <button onClick={handleVoteClick} disabled={voteLoading} style={styles.voteBtn}>Vote</button>}
    </div>
  )
}

const styles = {
  container: {
    padding: 8,
    width: 400
  },
  optionContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 4
  },
  optionProgress: {
    marginLeft: 4,
    marginRight: 2
  },
  voteBtn: { marginTop: 8 }
}
