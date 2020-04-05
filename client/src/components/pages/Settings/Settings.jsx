import React from 'react'
import { Form, Footer, Header, Layout, Grid } from '../../index'

const grid = {
  block: {
    'm-columns': '12',
    'col-gap': 'full',
  },
  elem: {
    'm-col': '7',
  },
}

const Settings = () => {
  return (
    <div className="layout">
      <Header className={{ distribute: 'between' }} />
      <Layout className={{ align: 'center', size: 's' }}>
        <Grid className={grid}>
          <Form />
        </Grid>
      </Layout>
      <Footer />
    </div>
  )
}

export default Settings
