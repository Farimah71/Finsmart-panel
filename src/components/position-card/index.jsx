import { Button } from "..";
import OfflineIcon from "../../assets/images/offline.png";
import SaveIcon from "../../assets/images/save.png";

export const PositionCard = ({ positions }) => {
  return positions?.map((position) => (
    <div className="w-full bg-white rounded-11 p-8 min-h-320 flex justify-between gap-x-8" key={position.id}>
      <div className="flex items-center gap-x-8">
        <div className="w-285 h-285 border-2 border-custom-gray-light rounded-30 overflow-hidden">
          <img src={position.logo} alt="logo" className="w-full"/>
        </div>
        <div className="w-max h-full flex flex-col justify-between items-start">
          <h4 className="text-custom-orange text-21">{position.company}</h4>
          <p className="text-21 font-bold">{position.title}</p>
          <div className="flex items-center gap-x-8">
            <p className="text-19">{position.features[0]}</p>
            <p className="text-19">{position.features[1]}</p>
            <p className="text-18 text-custom-blue">{position.salary}</p>
          </div>
          <div className="flex items-center gap-x-2 rounded-48 bg-custom-gray-light p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <g id="fluent:location-24-regular">
                <path
                  id="Vector"
                  d="M5.84341 4.56789C7.47635 2.93495 9.69109 2.01758 12.0004 2.01758C14.3097 2.01758 16.5245 2.93495 18.1574 4.56789C19.7903 6.20083 20.7077 8.41557 20.7077 10.7249C20.7077 13.0342 19.7903 15.249 18.1574 16.8819L16.9704 18.0559C16.0954 18.9139 14.9604 20.0179 13.5644 21.3679C13.1448 21.7736 12.584 22.0004 12.0004 22.0004C11.4168 22.0004 10.856 21.7736 10.4364 21.3679L6.94541 17.9719C6.50541 17.5409 6.13941 17.1779 5.84341 16.8819C5.03483 16.0734 4.39342 15.1135 3.95581 14.0571C3.5182 13.0006 3.29297 11.8684 3.29297 10.7249C3.29297 9.58142 3.5182 8.44914 3.95581 7.39272C4.39342 6.3363 5.03483 5.37642 5.84341 4.56789ZM17.0964 5.62789C16.4271 4.95861 15.6324 4.42772 14.7579 4.06553C13.8834 3.70334 12.9461 3.51695 11.9996 3.517C11.053 3.51704 10.1157 3.70353 9.24124 4.0658C8.36676 4.42807 7.57219 4.95904 6.90291 5.62839C6.23363 6.29774 5.70274 7.09236 5.34055 7.96688C4.97836 8.8414 4.79197 9.77869 4.79202 10.7252C4.79206 11.6718 4.97855 12.6091 5.34082 13.4836C5.70309 14.358 6.23406 15.1526 6.90341 15.8219L8.39141 17.2899C9.20941 18.0909 10.2394 19.0909 11.4794 20.2899C11.6192 20.4249 11.806 20.5004 12.0004 20.5004C12.1948 20.5004 12.3816 20.4249 12.5214 20.2899L15.9164 16.9899C16.3864 16.5289 16.7794 16.1399 17.0964 15.8219C18.4479 14.4703 19.2072 12.6372 19.2072 10.7259C19.2072 8.81453 18.4479 6.98146 17.0964 5.62989V5.62789ZM12.0004 7.99889C12.3946 7.99889 12.785 8.07654 13.1492 8.2274C13.5134 8.37827 13.8444 8.5994 14.1231 8.87816C14.4019 9.15692 14.623 9.48786 14.7739 9.85208C14.9248 10.2163 15.0024 10.6067 15.0024 11.0009C15.0024 11.3951 14.9248 11.7855 14.7739 12.1497C14.623 12.5139 14.4019 12.8449 14.1231 13.1236C13.8444 13.4024 13.5134 13.6235 13.1492 13.7744C12.785 13.9252 12.3946 14.0029 12.0004 14.0029C11.2139 13.9885 10.4644 13.666 9.91318 13.1047C9.36201 12.5433 9.0532 11.7881 9.0532 11.0014C9.0532 10.2147 9.36201 9.45944 9.91318 8.89812C10.4644 8.33679 11.2139 8.01425 12.0004 7.99989V7.99889ZM12.0004 9.49889C11.6021 9.49889 11.22 9.65714 10.9383 9.93882C10.6567 10.2205 10.4984 10.6025 10.4984 11.0009C10.4984 11.3992 10.6567 11.7813 10.9383 12.063C11.22 12.3446 11.6021 12.5029 12.0004 12.5029C12.3919 12.4928 12.764 12.3302 13.0373 12.0497C13.3107 11.7692 13.4637 11.393 13.4637 11.0014C13.4637 10.6097 13.3107 10.2336 13.0373 9.95311C12.764 9.67262 12.3919 9.51 12.0004 9.49989V9.49889Z"
                  fill="#FE6601"
                />
              </g>
            </svg>{" "}
            {position.location}
          </div>
          <Button theme="dark" title="more" classes="p-3 uppercase w-2/3" />
        </div>
      </div>
      <div className="w-max flex flex-col items-center justify-between">
        <div className="flex items-center gap-x-8">
          <img src={OfflineIcon} alt="offline" />{" "}
          <img src={SaveIcon} alt="save" />
        </div>
        <p className="text-custom-dark text-opacity-30">2 hours ago</p>
      </div>
    </div>
  ));
};
