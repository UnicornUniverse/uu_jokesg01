import Config from "./config/config";

const image = () => Config.Css.css`
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
`;

const ratingBox = () => Config.Css.css`
  border-top: 1px solid #BDBDBD;
  margin-top: 16px;
  padding: 16px 0;
  display: flex;
  align-items: center;
  font-size: 12px;
  color: rgba(0,0,0,0.54);
`;

const rating = () => Config.Css.css`
  margin-right: 16px;
  line-height: 20px;
`;

const line = () => Config.Css.css`
  font-size: 14px;
  line-height: 19px;
  color: rgba(0,0,0,0.75);
  padding: 4px 0;
  display: flex;
  align-items: center;
`;

const icon = () => Config.Css.css`
  font-size: 16px;
  color: #005DA7;
  margin-right: 8px;
`;

export default {
  image,
  ratingBox,
  rating,
  line,
  icon,
};
