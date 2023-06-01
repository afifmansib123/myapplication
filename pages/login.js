import Layout from "@/components/Layout";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function Login() {

    const { register, handleSubmit, watch, formState: { errors } } = useForm();

    const submithandler = ({email, password}) => {
        console.log(email,password)
    }
    return (
        <Layout>
            <section class="vh-100 gradient-custom">
                <div class="container py-5 h-100">
                    <div class="row justify-content-center align-items-center h-100">
                        <form onSubmit={handleSubmit(submithandler)}>
                            <div class="card-body p-4 p-md-5">
                                <h3 class="mb-4 pb-2 pb-md-0 mb-md-5">Login Form</h3>
                            </div>
                            <div class="row">
                                <div class="col-md-6 mb-4 pb-2">

                                    <div class="form-outline">
                                        <input type="email" id="emailAddress" class="form-control form-control-lg" 
                                        {...register('email', {required : 'please enter valid email',
                                        pattern:{
                                            value : /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                            message : 'please enter valid email'
                                        }})}
                                        />
                                        {errors.email && (<div className="text-red-500">{errors.email.message}</div>)}
                                        <label class="form-label" for="emailAddress">Email</label>
                                    </div>

                                </div>
                                <div class="col-md-6 mb-4 pb-2">
                                    <div class="form-outline">
                                        <input type="password" id="password" class="form-control form-control-lg" 
                                        {...register('password', {required : 'please enter password',
                                        minLength:{value:8,message:'password must be more than 7 charecters'}})}
                                        />
                                        {errors.password && (<div className="text-red-500">{errors.password.message}</div>)}
                                        <label class="form-label" for="password">Password</label>
                                    </div>

                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <button type="submit" class="btn btn-success">Login</button>
                                    <p>dont have an account yet?</p>
                                    <Link href="register">Register</Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </section>
        </Layout>
    )
}