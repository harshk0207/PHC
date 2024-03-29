import React, { Fragment, useEffect, useState, useContext } from 'react'
import InstituteLogo from '../../images/InstituteLogo.jpg';
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../../context/auth/AuthContext';


const LoginForm = () => {
    const authContext = useContext(AuthContext);
    const { isAuthenicated, error, login, loadUser, user } = authContext;
    const actors = [null, 'doctor', null, null, 'patient'];


    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const [form, setForm] = useState({
        role: '',
        email: '',
        password: '',
    })
    const [err, setErr] = useState({
        type: null,
        msg: null
    })

    useEffect(() => {
        if (localStorage.getItem('authenticated')) loadUser();
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (isAuthenicated) {
            loadUser();
            navigate(`/${actors[localStorage.getItem('role')]}`);
        }
        setErr({ msg: error });

    }, [isAuthenicated, error])

    const onChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault();
        login(form);
    }

    return (
        <div className="container containerStyle">
            <img className="rounded mx-auto d-block my-3" src={InstituteLogo} alt="Institute Logo" style={{ width: 120, height: 120 }} />
            <form>
                <h3 className="text-center mb-4"><b>Sign In to PHC</b></h3>
                <div className="form-outline mb-4">
                    {err.msg !== null ? <div class="alert alert-danger" role="alert" style={{ padding: "0.5rem" }}>
                        {err.msg}
                    </div> : null}
                    <select class="form-select" aria-label="Select Your Role" onChange={onChange} name='role'>
                        <option value="" disabled selected hidden>Select Your Role</option>
                        <option value="1">Doctor</option>
                        <option value="2">Compounder</option>
                        <option value="3">Admin</option>
                        <option value="4">Patient</option>
                    </select>
                </div>
                <div className="form-outline mb-4">
                    <input name='email' type="email" id="form2Example1" className="form-control" placeholder='Email address' onChange={onChange} />
                </div>
                <div className="form-outline mb-4">
                    <div class="input-group">
                        <input name="password" type={!show ? 'password' : 'text'} class="input form-control" id="password" placeholder="password" required="true" aria-label="password" aria-describedby="basic-addon1" onChange={onChange} />
                        <div class="input-group-append">
                            <span class="input-group-text" onClick={() => setShow(!show)}>
                                <i class="fas fa-eye" id="show_eye"></i>
                            </span>
                        </div>
                    </div>
                </div>
                <div className="row mb-4">
                    <div className="col mx-auto">
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="form2Example31" checked />
                            <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
                        </div>
                    </div>
                    <div className="col text-end">
                        <a href="#!">Forgot password?</a>
                    </div>
                </div>
                <div class="d-grid gap-2">
                    <button class="btn btn-primary" type="button" onClick={onSubmit}>Sign In</button>
                </div>
                <div className="text-center">
                    <hr />
                    <p><strong>Not a member?</strong><a href="#!"> Register</a></p>
                </div>
            </form>
        </div>
    )
}

export default LoginForm