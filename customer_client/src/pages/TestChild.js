import TestChild2 from "./TestChild2"

const TestChild = ({name}) => {
  return (
      <>
        <TestChild2 name={name} />
      </>
  )
}

export default TestChild