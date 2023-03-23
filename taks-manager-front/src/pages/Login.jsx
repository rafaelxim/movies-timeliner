import React from 'react'
import axios from 'axios';

class Login extends React.Component {

    state = {
        email : "",
        password: "",
        errorMessage: null  ,
        loading : false        
    };

    handleSubmit = async (e) => {
        e.preventDefault(); 
        this.setState({
            loading : true
        })        
        
        // Lógica de Login  
        try{
            let resultLogin = await axios.post("http://localhost:3900/api/auth", {
                "email": this.state.email,
                "password" : this.state.password
            });
            localStorage.setItem('x-auth-token', resultLogin.data )
            this.props.history.push('/');
        }   
        catch(e){
            this.setState({
                errorMessage : e.response.data,
                loading : false
            })
        }          
    }

    componentDidMount(){
        const token = localStorage.getItem('x-auth-token');
        if(token) this.props.history.push('/');
    }

    render(){
        return (
            <div className="splash-container">
            <div className="card ">
                <div className="card-header text-center">
                    Minhas Tasks!
                    <span className="splash-description">Digite suas informações</span></div>
                <div className="card-body">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input onChange={(e) => this.setState({email : e.target.value})}  className="form-control form-control-lg" id="username" type="text" placeholder="Usuário" />
                        </div>
                        <div className="form-group">
                            <input onChange={(e) => this.setState({password : e.target.value})} className="form-control form-control-lg" id="password" type="password" placeholder="Password" />
                        </div>
                        <div className="form-group">
                            <label className="custom-control custom-checkbox">
                                <input className="custom-control-input" type="checkbox" /><span className="custom-control-label">Lembrar de mim</span>
                            </label>
                        </div>
                        { this.state.errorMessage && <div>{this.state.errorMessage}</div> } 
                        <button type="submit" className="btn btn-primary btn-lg btn-block" disabled={this.state.loading}>Entrar</button>
                    </form>
                </div>
                {/* <div className="card-footer bg-white p-0  ">
                    <div className="card-footer-item card-footer-item-bordered">
                        <a href="#" className="footer-link">Criar conta</a></div>
                    <div className="card-footer-item card-footer-item-bordered">
                        <a href="#" className="footer-link">Esqueci Password</a>
                    </div>
                </div> */}
            </div>
        </div>
        )
    }    
}
export default Login ; 