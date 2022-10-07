import { useState, useRef, Dispatch, SetStateAction } from 'react'
import { Button, Center, Flex, Heading, Spinner, Text, Textarea } from '@chakra-ui/react'

export default function App() {
  const [result, setResult] = useState<any>(undefined)
  console.log(result)


  if (result === undefined) {
    return <Layout> <NoTraceback setResult={setResult} /></Layout>
  } else if (result === null) {
    return <Layout>
      <Center h="60vh">
        <Spinner />
      </Center>
    </Layout>
  } else {

    return (
      <Layout>
        <Center minH="60vh" maxH="60vh" flexDir="column">

          <Text fontSize="2xl">User is likely running nextcord {result.likely}. Which is {result.latest == result.likely ? "" : "not"} latest</Text>
        </Center>
        <Button onClick={(_) => setResult(undefined)}>Go back</Button>
      </Layout>

    )
  }

}

function NoTraceback({ setResult }: { setResult: Dispatch<SetStateAction<any>> }) {
  const ref = useRef<HTMLTextAreaElement>(null)

  return <>

    <Textarea ref={ref} spellCheck="false" h="60vh" resize="none" my="10" placeholder="Paste traceback here"></Textarea>
    <Button onClick={async (_) => {
      if (ref.current) {
        const text = ref.current.value
        fetch("https://api.traced.teaishealthy.me", {
          method: "POST",
          body: text,
          headers: {
            "Content-Type": "text/plain"
          }
        }).then(response => response.json()).then(data => {
          setResult(data)
        })
        setResult(null)
      }
    }}>Send traceback</Button>

  </>
}

function Layout({ children }: { children: any }) {
  return <Flex flexDir="column">
    <Heading>tracedcord</Heading>
    <Heading as="h3" size="sm">Check whether what version of nextcord someone is using, just by their traceback!</Heading>
    {children}
  </Flex>
}