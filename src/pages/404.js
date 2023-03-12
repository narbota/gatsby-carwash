import * as React from "react"
import { Link } from "gatsby"
import { Result } from "antd"

const NotFoundPage = () => {
  return (
    <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Link to="/">Go home</Link>}
  />
  )
}

export default NotFoundPage

export const Head = () => <title>Not found</title>
