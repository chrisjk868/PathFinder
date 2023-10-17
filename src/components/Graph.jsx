import React, { useRef, useEffect, useState } from 'react';
import './styles/Graph.css';
import Cell from './Cell';
import { Container } from 'react-bootstrap';


function computeBoard(ROWS, COLS) {
	const graph = [];
	for (let row = 0; row < ROWS; row++) {
		graph.push([]);
		for (let col = 0; col < COLS; col++) {
			graph[row].push([]);
		}
	}
	return graph;
}

function computeNodes(ROWS, COLS) {
    return (
        Array( ROWS )
            .fill()
            .map((_row, rowIdx) =>
								Array( COLS )
								.fill()
								.map((_col, colIdx) => ({ x: colIdx, y: rowIdx, isStart: false, isEnd: false, isWall: false, backgroundColor: '' }))
            )
    )
}


function Graph(props) {

    const graphRef = useRef(null)
    const [ROWS, COLS] = [ Math.floor(props.height / 20), Math.floor(props.width / 35) ];
    const [nodes, setNodes] = useState([]);
    const [graph, setGraph] = useState([]); 
    const [addedStart, setAddedStart] = useState(false);
    const [addedEnd, setAddedEnd] = useState(false);

    // Hook that rerenders the board if the size of window changes
    useEffect(() => {
        setNodes(computeNodes(ROWS, COLS));
        setGraph(computeBoard(ROWS, COLS));
		setAddedStart(false);
		setAddedEnd(false);
        // console.log('Graph:', props.height, props.width);
        // console.log('Board Dimensions:', ROWS, COLS)
        // console.log(nodes);
        // console.log(graph);
    }, [props.width, props.height]);

    // Recieving data from child cell
    const handleCick = (coords) => {
		let newNodes = [...nodes];
		const {x: x, y: y} = coords;
        console.log('Clicked coordinates from graph \n', coords);

		if (!addedStart) {
			newNodes[y][x]['backgroundColor'] = 'green';
			newNodes[y][x]['isStart'] = true;
			setAddedStart(true);
		} else if (!addedEnd) {
			newNodes[y][x]['backgroundColor'] = 'red';
			newNodes[y][x]['isEnd'] = true;
			setAddedEnd(true);
		} else if (!newNodes[y][x]['isStart'] &&
				   !newNodes[y][x]['isEnd']) {
			newNodes[y][x]['backgroundColor'] = '#00008B';
			newNodes[y][x]['isEnd'] = true;
		}

        // Change the state of the related cell in nodes
        // console.log(newNodes);
        // newNodes[y][x]['backgroundColor'] = 'green';
        setNodes(newNodes);
    }
    
    return (
        <div className='graph' ref={graphRef}>
            {graph.map((row, rowIdx) => {
                let rowId = `row-${rowIdx}`;
                return (
                    <div id={rowId} key={rowIdx}>
                        {
                            row.map((col, colIdx) => {
                                let cellId = String(rowIdx).concat('-', (colIdx));
                                let cell = (<Cell row={rowIdx}
                                                  col={colIdx}
                                                  id={cellId}
                                                  handleClick={handleCick}
                                                  backgroundColor={nodes[rowIdx][colIdx]['backgroundColor']}
                                                  key={[colIdx, rowIdx]}
                                            />);
                                return cell;
                            })
                        }
                    </div>
                );
            })}
        </div>
    )
}

export default Graph;