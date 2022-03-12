import { gql } from '@apollo/client'

export const NEW_QUESTION = gql`
  mutation newQuestion($input: questions_insert_input!) {
    insert_questions_one(object: $input) {
      id
    }
  }
`

export const NEW_VOTE = gql`
  mutation newVote($input: votes_insert_input!) {
    insert_votes_one(object: $input) {
      id
    }
  }
`
