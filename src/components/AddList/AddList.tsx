import * as React from 'react'

import { useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import { Input } from '..'
import { createColumn } from '../../graphql/mutations'
import { CreateColumnMutation, CreateColumnMutationVariables } from '../../API'

type Props = {
  refetch: any
  numColumns: number
  placeholder?: string
}

const AddList: React.FC<Props> = props => {
  const [createColumnMutation] = useMutation<
    CreateColumnMutation,
    CreateColumnMutationVariables
  >(gql(createColumn))
  const { placeholder, numColumns, refetch } = props
  const [text, setText] = React.useState<string>('')
  const [isLoading, setLoading] = React.useState(false)

  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    console.log('handlechange')
    setText(evt.target.value)
  }

  const handleSubmit = async (evt: React.FormEvent) => {
    console.log('handlesubmit')
    setLoading(true)
    const input = { name: text, position: numColumns }
    console.log({ input })
    evt.preventDefault()
    try {
      await createColumnMutation({
        variables: { input },
      })
      setText('')
      await refetch()
    } catch (error) {
      console.log(error)
    } finally {
      console.log('finally')
      setLoading(false)
    }
  }
  // if (loading) {
  //   return <Loader />
  // }

  return (
    <div
      style={{
        display: 'inline',
        margin: '0 0 0 13px',
      }}
    >
      <form onSubmit={handleSubmit} style={{ display: 'inline' }}>
        <Input
          type="text"
          style={{ background: 'rgba(255,255,255,0.1)' }}
          placeholder={placeholder || 'Add a list...'}
          onChange={handleChange}
          value={text}
          data-testid="input-addlist"
          loading={isLoading}
        />
      </form>
    </div>
  )
}

export default AddList
