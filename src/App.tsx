import './App.css';
import Game from "./components/Game";
import {useDispatch} from "react-redux";
import {onMouseEnter} from "./state/actions";

const App = () => {
    const dispatch = useDispatch();
      return (
          <div
              className="APP z100"
              onMouseOver={(e) => dispatch(onMouseEnter({ target: 'APP' }))}
          >
              <Game />
        </div>
      );
}

export default App;
