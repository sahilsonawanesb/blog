import { Button } from "flowbite-react"


function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border
         border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
        <div className="flex-1 justify-center flex flex-col">
            <h2 className="text-2xl">
                Want to learn more about Javascript and React.js
            </h2>
            <p className="text-gray-500 my-2">
                Checkout these resources or project fot for references.
            </p>
            <Button gradientDuoTone="purpleToPink" className="rounded-tl-xl rounded-bl-none">
                <a href="#" target="_blank" rel="noopener noreferrer ">
                    Learn More
                </a>
            </Button>
        </div>
        <div className="p-10 flex-1">
            <img src="https://i.ytimg.com/vi/ACaT1Gfhe6I/maxresdefault.jpg" alt="" />
        </div>
    </div>
  )
}

export default CallToAction
