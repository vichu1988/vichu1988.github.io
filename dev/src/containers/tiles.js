import React from 'react'
import { connect } from 'react-redux'
import Tile from './tile'
import { filter } from 'lodash'

class Tiles extends React.Component {
  constructor (props) {
    super(props)

  }

  render () {
    return (<div className="row">{
      this.props.tiles ?
        this.props.tiles.map(tile => {
          return (<Tile key={tile.id} tile={tile}/>)
        }) : 'Loading ...'}
    </div>)
  }
}

function mapStateToProps (state) {
  let tiles
  if (state.searchTerm) {
    const termRegex = new RegExp(state.searchTerm, 'gi')
    tiles = filter(state.tiles, (repo) => termRegex.test(repo.name))
  } else {
    return { tiles: state.tiles, term: state.searchTerm }
  }
  return { tiles: tiles, term: state.searchTerm }
}

export default connect(mapStateToProps)(Tiles)
