import React, { useState, useEffect } from "react";
import Style from "./Top3.module.css";
import { MdVerified } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import images from "../../img"; 
import Image from "next/image";
const Top3 = ({ creators, index }) => {
  const [topCreators, setTopCreators] = useState([]);
  const [following, setFollowing] = useState({});

  useEffect(() => {
    const eventSource = new EventSource(
      "https://testapi.thedaygalpuclub.com/api/v1/nfts/top-5-creators"
    );

    eventSource.addEventListener("update", (event) => {
      const data = JSON.parse(event.data);
      setTopCreators(data);
    });

    return () => eventSource.close();
  }, []);
  const followMe = (id) => {
    setFollowing((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  return (
    <div className={Style.FollowerTabCard}>
      {topCreators.map((creator, index) => (
        <div className={Style.FollowerTabCard_box} key={creator._id}>
          <div className={Style.FollowerTabCard_rank}>
          <p>
          #{index + 1}{" "}
          {index === 0 ? (
            <span>🥇</span>
          ) : index === 1 ? (
            <span>🥈</span>
          ) : index === 2 ? (
            <span>🥉</span>
          ) : (
            <span>🏆</span>
          )}
        </p>
      </div>
          <div className={Style.FollowerTabCard_box_img}>
            <Image
              className={Style.FollowerTabCard_box_img_img}
              src={images.creatorbackground1}
              alt="profile braground"
              width={500}
              height={300}
              objectFit="cover"
            />
          </div>
          <div className={Style.FollowerTabCard_box_profile}>
            <Image
              className={Style.FollowerTabCard_box_profile_img}
              alt="profile picture"
              width={50}
              height={50}
              src={images.founder1}
            />
          </div>
          <div className={Style.FollowerTabCard_box_info}>
            <div className={Style.FollowerTabCard_box_info_name}>
            <h4>
                {creator && creator._id ? creator._id.slice(0, 12) : ''}
                {""}{" "}
                <span>
                  <MdVerified />
                </span>
              </h4>
              <p>{(creator.totalSpending|| 0).toFixed(4)} ETH</p>
            </div>
            <div className={Style.FollowerTabCard_box_info_following}>
            <button
              onClick={() => followMe(creator._id)}
              className={Style.followButton}
            >
              {following[creator._id] ? (
                <>
                  Follow{""}{" "}
                  <span>
                    <TiTick />
                  </span>
                </>
              ) : (
                <>Following</>
              )}
            </button>
          </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Top3;
