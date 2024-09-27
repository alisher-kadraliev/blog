import React from 'react'
import Create from './pageForm'
import db from '@/lib/db'

const Createpage = async () => {
    const category = await db.category.findMany()
    const tags = await db.tag.findMany()

    return (
        <div className='mb-96'>
            <Create categoriesList={category} tagsList={tags} />
        </div>
    )
}

export default Createpage