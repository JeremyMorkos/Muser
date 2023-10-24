import Home from '../components/Home/Home'

const HomePage = ({tracks, setTracks}) =>{
    document.title = 'Home'
    return <Home tracks={tracks} setTracks={setTracks} /> 
}

export default HomePage