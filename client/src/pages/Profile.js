import React from 'react'
import profilephoto from "../images/profilephoto.jpeg"
const Profile = () => {
    return (
        <div><div className="page-wrapper">
            <div className="dashboard-content-wrapper">
                <div className="dashboard-content-wrap">
                    <div className="page-title">
                        <h2 className="page-heading">User Profile</h2>
                    </div>
                    <div className="uesr-wrapper">
                        <div className="uesr-banner">
                            <div className="uesr-banner-image"><img
                                src="https://assets.website-files.com/61f7c38c8268bb1cdf5a1316/61fbd739248733a9189cdf17_Uesr-Banner.png"
                                loading="lazy"
                                sizes="(max-width: 479px) 94vw, (max-width: 767px) 95vw, (max-width: 991px) 96vw, (max-width: 1594px) 69vw, 1100px"
                                srcset="https://assets.website-files.com/61f7c38c8268bb1cdf5a1316/61fbd739248733a9189cdf17_Uesr-Banner-p-500.png 500w, https://assets.website-files.com/61f7c38c8268bb1cdf5a1316/61fbd739248733a9189cdf17_Uesr-Banner-p-800.png 800w, https://assets.website-files.com/61f7c38c8268bb1cdf5a1316/61fbd739248733a9189cdf17_Uesr-Banner-p-1080.png 1080w, https://assets.website-files.com/61f7c38c8268bb1cdf5a1316/61fbd739248733a9189cdf17_Uesr-Banner.png 1100w"
                                alt="" className="banner" /></div>
                            <div className="profile-content-bg">
                                <div className="profiles-wrapper">
                                    <div className="main-profile">
                                        <div className="profile-image-content">
                                            <div className="ozzy-osbourne-image"><img
                                                src={profilephoto}
                                                style={{
                                                    objectFit: "cover",
                                                    height: "250px",
                                                    width: "250px",
                                                    overflow: "hidden"
                                                }}
                                                loading="lazy" alt="" className="profile-images" /></div>
                                            <div className="profile-name">
                                                <h3 className="name">Nitish Tiwari</h3>
                                                <div className="exprence">Web Developer</div>
                                            </div>
                                        </div>
                                        <div className="follow-button"><a href="#" className="button w-button">Follow</a></div>
                                    </div>
                                </div>
                                <div className="profile-tabs">
                                    <div data-current="Tab 1" data-easing="ease" data-duration-in="300"
                                        data-duration-out="100" className="w-tabs">
                                        <div className="tabs-menu w-tab-menu"><a data-w-tab="Tab 1"
                                            className="tabs-link w-inline-block w-tab-link w--current">
                                            <div className="tabs-text">About</div>
                                        </a></div>
                                        <div className="w-tab-content">
                                            <div data-w-tab="Tab 1" className="w-tab-pane w--tab-active">
                                                <div className="tabs-grid-wrap">
                                                    <div className="w-layout-grid profile-grid">
                                                        <div className="profile-bio">
                                                            <div className="profile-bio-content">
                                                                <div className="profile-text-content">
                                                                    <h3 className="profile-bio-title">Profile Bio</h3>
                                                                    <p className="bio-paragraph mb">A curious and passionate individual, who is eager to learn
                                                                        and dive deep into the subject matter. An intuitive mind with an ability to trust one’s instincts, particularly in complex
                                                                        circumstances. Strong desire to work in a positive environment with a wide range of exposure.
                                                                    </p>
                                                                </div>
                                                                <div className="profile-content">
                                                                    <div className="contact-wrapper">
                                                                        <div className="profile-text-wrapper">
                                                                            <h4 className="contact-name">Full Name:</h4>
                                                                            <h4 className="contact-name">Mobile:</h4>
                                                                            <h4 className="contact-name">Email:</h4>

                                                                        </div>
                                                                        <div className="contact-gamil">
                                                                            <div className="contact-number">Nitish Tiwari</div>
                                                                            <div className="contact-number">+91 926 564 6059
                                                                            </div>
                                                                            <div className="contact-number">
                                                                                nitish123455@gmail.com</div>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>

    )
}
export default Profile