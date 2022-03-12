import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { NEW_QUESTION } from '../graphql/mutations'

export const New = () => {
  const [saveQuestion, { loading }] = useMutation(NEW_QUESTION)

  const [title, setTitle] = useState('')
  const [options, setOptions] = useState(['', ''])

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleOptionChange = (index) => {
    return (event) => {
      setOptions((options) => {
        const updatedOptions = [...options]
        updatedOptions[index] = event.target.value
        return updatedOptions
      })
    }
  }

  const handleRemoveOptionClick = (index) => {
    return () => {
      if (options.length <= 2) return

      setOptions((options) => {
        const updatedOptions = [...options]
        updatedOptions.splice(index, 1)
        return updatedOptions
      })
    }
  }

  const handleAddOptionClick = () => {
    setOptions((options) => [...options, ''])
  }

  const resetFields = () => {
    setTitle('')
    setOptions(['', ''])
  }

  const handleSaveClick = async () => {
    if (options.some((option) => !option)) return

    await saveQuestion({
      variables: {
        input: {
          title,
          options: {
            data: options.map((option) => ({ title: option }))
          }
        }
      }
    })
    resetFields()
  }

  return (
    <div style={{ width: 360 }}>
      <h2>New Question</h2>
      <input value={title} onChange={handleTitleChange} placeholder='Title' style={styles.titleInput} />
      <h3>Options</h3>
      {options.map((option, index) => (
        <div
          key={`${option}-${index}`}
          style={styles.optionContainer}
        >
          <input
            value={options[index]}
            onChange={handleOptionChange(index)}
            placeholder='Enter option...'
            style={styles.optionInput}
          />
          <button onClick={handleRemoveOptionClick(index)} style={{ marginLeft: 4 }}>-</button>
        </div>
      ))}

      <button style={styles.addOptionBtn} onClick={handleAddOptionClick}>+</button>
      <button onClick={handleSaveClick} disabled={loading} style={styles.createBtn}>Create</button>
    </div>
  )
}

const styles = {
  titleInput: { width: '100%' },
  optionContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 8
  },
  optionInput: { width: '100%' },
  addOptionBtn: {
    display: 'block',
    width: '100%',
    marginTop: 8
  },
  createBtn: {
    display: 'block',
    width: '100%',
    marginTop: 16
  }
}
