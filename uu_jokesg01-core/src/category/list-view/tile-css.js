import Config from "./config/config";

const TILE_HEIGHT = 40; // px

const main = () => Config.Css.css`
  height: ${TILE_HEIGHT}px;
  border-radius: 4px;
  border: 1px solid #bdbdbd;
`;

const text = () => Config.Css.css`
  font-size: 16px;
  line-height: 21px;
  max-height: 42px;
  overflow: hidden;
  color: #004378;
  font-weight: bold;
width:70%;
  margin: 0;
  position: absolute;
  top: 47%;
  left: 47%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  `;

const content = () => Config.Css.css`
  height: 100px;
  color: rgba(0, 0, 0, 0.87);
  overflow: hidden;
  padding: 8px;
`;

const icon = () => Config.Css.css`
  font-size: 20px;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.54);
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 5%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

const buttonDelete = () => Config.Css.css`
  font-size: 20px;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.54);
  margin-right: 0px;
  cursor: pointer;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 92%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

const buttonUpdate = () => Config.Css.css`
  font-size: 20px;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.54);
  margin-right: 0px;
  cursor: pointer;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 97%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

export default {
  main,
  content,
  text,
  icon,
  buttonUpdate,
  buttonDelete,
  TILE_HEIGHT,
};
