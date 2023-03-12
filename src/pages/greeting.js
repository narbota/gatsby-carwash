import * as React from "react"
import { Link } from "gatsby"
import { Result } from "antd"

const greeting = () => {
  return (
    <Result
    status="404"
    title="404"
    subTitle="Hi yall."
    extra={<Link to="/">Go home</Link>}
  />
  )
}

export default greeting

export const Head = () => <title>Greeting</title>
