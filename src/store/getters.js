//getters of state
const mapStateToProps = (state) => {
    return { state : state }
}

export const mapAuthenticatedToProps = (state) => {
    return { authenticated : state.authenticated }
}

export default mapStateToProps