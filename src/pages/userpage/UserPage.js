import React, {useContext, useEffect} from "react";
import {useParams, useHistory} from "react-router-dom";
import ChangeProfile from "../../components/changeprofile/ChangeProfile";
import {AuthContext} from "../../context/AuthContext";
import './UserPage.css'
import defaultProfilePicture from "../../assets/profilePicture.jpg";

function UserPage({setNavData}) {

    const {auth} = useContext(AuthContext);
    const {setAccount} = useParams();
    const history = useHistory();

    useEffect(() => {setNavData(`Profile of ${auth.user.username}`)}, []);

    return (
        <main className="personalPage">
            {setAccount === 'setImage' ?

                <ChangeProfile
                    title={'Setup your profile picture'}
                    currentDetailsTitle={'Current profile picture'}
                    description={'You can setup your profile picture by filling in the image field below\n' +
                    '                with a Base64-String' +
                    'Make sure to copy Base64 Image source'}
                    urlText={'You can convert your image to a base64-String on this website!'}
                    url={'https://www.base64encoder.io/image-to-base64-converter/'}
                    inputFieldDescription={'Put your base64-string in here'}
                    setNavData={setNavData}
                />

                : setAccount === 'changeEmail' ?
                    <ChangeProfile
                        title={'Setup your email'}
                        description={'You can setup a new email-address on this page just fill in a new adress below.'}
                        currentDetailsTitle={'Current email-address:'}
                        currentDetails={<h1>{auth.user.email}</h1>}
                        inputFieldDescription={'Fil in your new email-address below'}
                        setNavData={setNavData}
                    />
                    : setAccount === 'changePassword' ?
                        <ChangeProfile
                            title="Change your password!"
                            description="You can change your password here! Make sure to keep it secure!"
                            currentDetails={<p>Choose your new password below! Fill it in twice and confirm it with your
                                old password!</p>}
                            inputFieldDescription="Fill in your new password"
                            setNavData={setNavData}
                        />
                        :
                        <section className="personalPageInfo">
                            <div className="personalPageContainer">
                                <h1 className="personalPageTitle">ProfilePicture</h1>
                                <img src={auth.user.profilePicture ? auth.user.profilePicture : defaultProfilePicture}
                                     className="userPageProfilePicture"/>
                                <h1 className="personalPageTitleUserName">Username: {auth.user.username}</h1>
                                <h1 className="personalPageTitleEmail">Email-adress: {auth.user.email}</h1>
                            </div>
                            <div className="personalPageInputInfo">
                                <button className="personalPageButton" onClick={() => {
                                    history.push
                                    ('/userPage/setImage')
                                }}>Change Profile picture
                                </button>
                                <button className="personalPageButton" onClick={() => {
                                    history.push('/userPage/changeEmail')
                                }}>Change email-adress
                                </button>
                                <button className="personalPageButton" onClick={() => {
                                    history.push('/userPage/changePassword')
                                }}>Change password
                                </button>
                            </div>
                        </section>}
        </main>

    )


}


export default UserPage