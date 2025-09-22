import Image from "next/image";
import { adminFrame } from "@/public/assets/image";
import { Hands } from "@/public/assets/icon";

const Welcome = (props) => {

  console.log(props.userData.profilePicture);
  
  return (
    <div className="welcome">
      <div className="user">
        {props.userData && props.userData.profilePicture == undefined ? (
          <div
            className="noImage"
            style={{
              width: '134px',
              height: '134px',
              textAlign: 'center',
              background: '#a09ef9',
              fontSize: '50px',
              textTransform: 'uppercase',
              color: '#ffffff',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '10px',
            }}
          >
            {props.userData.accountName.slice(0, 2)}
          </div>
        ) : (
          <Image
            src={props.userData?.profilePicture}
            alt="profile"
            width={134}
            height={134}
          />
        )}

        <div className="name">
          <p className="greet">Hi, {props.userData && props.userData.accountName}</p>
          <div className="wave">
            <Image src={Hands} alt="hand" />
            <p>Welcome back!</p>
          </div>
        </div>
      </div>
      <Image src={adminFrame} alt="frame" />
    </div>
  );
};

export default Welcome;
