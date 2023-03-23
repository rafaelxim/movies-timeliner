import React from 'react'
import { Link } from 'react-router-dom';

const PageHeader = (props) => {

    const breadElement = props.breadcrumb.map(b => {
        return (
            <li className="breadcrumb-item" key={b.name}>
                <Link to={b.link || '/'} className="breadcrumb-link">{b.name}</Link>
            </li>
        )
    })

    return (

        <div className="row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="page-header">
                    <h2 className="pageheader-title"> {props.title} </h2>
                    <p className="pageheader-text">Proin placerat ante duiullam scelerisque a velit ac porta, fusce sit amet vestibulum mi. Morbi lobortis pulvinar quam.</p>
                    <div className="page-breadcrumb">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                {breadElement}
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageHeader