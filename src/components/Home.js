import Profile from './Profile'

const Home = ({ user }) => {
    return (
        <div>
            <Profile user={user} />
        </div>
    )
}

export default Home
