import Search from '../components/Search/Search'

const SearchPage = ({tracks, setTracks}) =>{
    document.title = 'Home'
    return <Search tracks={tracks} setTracks={setTracks} /> 
}

export default SearchPage