import { Button, Container, Dropdown, ToggleButton } from "react-bootstrap";
import { FaBomb } from "react-icons/fa"
import { PiPathBold, PiEraserFill } from "react-icons/pi"
import { GiMaze } from 'react-icons/gi'
import { useState } from "react";
import './styles/ConfigBar.css';

function ConfigBar({ runPfAlgo, clearBoard, generateMaze, btnStates, handleSelect, mazeAlgo, pfAlgo }) {

    const [checked, setChecked] = useState(false);

    const getState = (btn) => {
        let states = JSON.parse(btnStates);
        return states[btn];
    }

    return (
        <div className="configBar">
            <Dropdown onSelect={handleSelect}>
                <Dropdown.Toggle variant="secondary">
                    {mazeAlgo}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item className='mazeAlgo'>Randomized DFS</Dropdown.Item>
                    <Dropdown.Item className='mazeAlgo'>MST</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Dropdown onSelect={handleSelect}>
                <Dropdown.Toggle variant="secondary">
                    {pfAlgo}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item className='pathAlgo'>BFS</Dropdown.Item>
                    <Dropdown.Item className='pathAlgo'>DFS</Dropdown.Item>
                    <Dropdown.Item className='pathAlgo'>Disjkstra's</Dropdown.Item>
                    <Dropdown.Item className='pathAlgo'>A*</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <Button id="gen-maze" variant="outline-light" onClick={() => {generateMaze();}} disabled={getState('gen-maze')}> Create Maze <GiMaze/> </Button>
            <Button id="search-algo" variant="outline-light" onClick={() => {runPfAlgo();}} disabled={getState('search-algo')}> Find Path <PiPathBold/> </Button>
            <ToggleButton id="add-bomb" variant="outline-light" type="checkbox" checked={checked} onClick={(e) => { e.preventDefault(); setChecked(!checked);}}> Add Bombs <FaBomb/> </ToggleButton>
            <Button id="reset-board" variant="outline-light" onClick={() => {clearBoard();}} disabled={getState('reset-board')}> Clear Board <PiEraserFill/> </Button>

        </div>
    )

}

export default ConfigBar;