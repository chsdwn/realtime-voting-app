import { gql } from '@apollo/client'

export const QUESTION = gql`
  subscription getQuestion($id: Int!) {
    questions_by_pk(id: $id) {
      id
      title
      options {
        id
        title
        votes_aggregate {
          aggregate {
            count
          }
        }
      }
    }
  }
`

export const QUESTIONS = gql`
  subscription {
    questions(order_by: { id: desc }) {
      id
      title
    }
  }
`
