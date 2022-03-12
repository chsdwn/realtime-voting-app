import React from 'react'
import { Link } from 'react-router-dom'
import { useSubscription } from '@apollo/client'
import { Loading } from '../components/Loading'
import { QUESTIONS } from '../graphql/subscriptions'

export const Questions = () => {
  const { data, loading } = useSubscription(QUESTIONS)

  if (loading) return <Loading />

  return (
    <div style={{ padding: 8, paddingTop: 8 }}>
      {data?.questions.map((question) => (
        <p key={question.id}>
          <Link to={`/question/${question.id}`}>
            {question.title}
          </Link>
        </p>
      ))}
    </div>
  )
}
