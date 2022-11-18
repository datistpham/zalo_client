import React from 'react'
import SearchAndList from '../SearchAndList/SearchAndList'

const DefaultPage = (props) => {
  return (
    <div>
        <SearchAndList is_default_page={true} />
    </div>
  )
}

export default DefaultPage