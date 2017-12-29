import React from 'react'

class SearchForm extends React.Component {
    render() {
        return (
            <div className="search-container">
                <div className="search-input-container">
                    <input 
                        type="search" 
                        id="search" 
                        placeholder="¿Qué buscas?"
                        autoFocus
                        value={this.props.value}
                        onChange={this.props.onChange} 
                        onKeyPress={this.props.onKeyPress} />
                    <button 
                        className="icon-search"
                        onClick={this.props.onClick}>
                        <i className="fa fa-search"></i>
                    </button>
                </div>
            </div>
        )
    }
}

export default SearchForm