import './style.scss'
function Search() {
  return (
    <div className="searchBar">
      <form>
        <input placeholder="输入搜索到内容" name="cname" type="text"></input>
        <button type="submit"></button>
      </form>
    </div>
  )
}
export default Search
