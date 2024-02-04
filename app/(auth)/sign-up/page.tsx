"use client"

import { z } from "zod"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { SignUpSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { ErrorMessage } from "@hookform/error-message"
import LockPersonIcon from '@mui/icons-material/LockPerson'
import toast from "react-hot-toast"
import { signUpAction } from "@/actions/signup"
import { useTransition } from "react"



function SignUp() {

  const [isPending, startTransition] = useTransition()

  //client-side validation
  const { handleSubmit, register, formState: { errors } } = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: 'fake@gmail.com',
      password: '',
      name: ''
    }
  })

  const submitForm = (data: z.infer<typeof SignUpSchema>) => {
    startTransition(() => {
      signUpAction(data)
        .then(res => {
          if (res.success) toast.success(res.success)
          else toast.error(res.error as string)
        })
    })

  }

  return (
    <div className="w-full h-screen flex items-center">
      <div className="w-1/2 mx-auto bg-slate-200 text-purple-600 rounded-lg flex-col py-4 space-y-6 items-center text-center">
        <p className=" text-center pl-2"><LockPersonIcon className=" text-purple-400" /> welcome to sign-up form...</p>
        <div className=" flex-col px-4">
          <form onSubmit={handleSubmit(submitForm)}>
            <div className="my-4">
              <label htmlFor="text" className=" font-semibold pr-8">Name:</label>
              <input
                type="text"
                id="text"
                className="w-3/4 outline-none focus:outline-none p-2 rounded-lg"
                {...register('name')}
              />
              <ErrorMessage
                errors={errors}
                name="name"
                render={({ message }) => <p className=" text-red-600 text-left pl-5 pt-1">{message}</p>}
              />
            </div>
            <div className="my-4">
              <label htmlFor="email" className=" font-semibold pr-8">Email:</label>
              <input
                type="email"
                id="email"
                placeholder="example@gmail.com"
                className="w-3/4 outline-none focus:outline-none p-2 rounded-lg"
                {...register('email')}
              />
              <ErrorMessage
                errors={errors}
                name="email"
                render={({ message }) => <p className=" text-red-600 text-left pl-5 pt-1">{message}</p>}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className=" font-semibold pr-2">Password:</label>
              <input
                type="password"
                id="password"
                placeholder="******"
                className=" w-3/4 outline-none focus:outline-none p-2 rounded-lg"
                {...register('password')}
              />
              <ErrorMessage
                errors={errors}
                name="password"
                render={({ message }) => <p className=" text-red-600 text-left pl-5 pt-1">{message}</p>}
              />
            </div>
            <button className="disabled:cursor-not-allowed w-full font-semibold transition-all duration-500 text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-slate-200 border bottom-1 rounded-lg px-4 py-2" disabled={isPending}>
              Submit
            </button>
          </form>

        </div>
        <div className="px-4 flex space-x-2 items-center justify-center font-semibold text-lg">
          <button className=" w-1/2 transition-all duration-500 text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-slate-200 border bottom-1 rounded-lg px-4 py-2">Google</button>
          <button className="w-1/2 transition-all duration-500 text-purple-400 border-purple-400 hover:bg-purple-400 hover:text-slate-200 border bottom-1 rounded-lg px-4 py-2">Github</button>
        </div>
        <p>Have an account?
          <Link href='/sign-in' className="px-2 font-bold text-purple-600" >Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp