import React, { useContext, useState, Fragment, useEffect } from "react";
import { observer } from "mobx-react";
import { Card, CardBody, CardHeader, Button, Row, Col } from "reactstrap";
import UserStore from "../../stores/UserStore";
import ProfileDetails from "./Components/ProfileDetails";
import EditProfile from "./Components/EditProfile";
import CEO_STORY from "./Components/CEOStory";
import STORY from "./Ceo_story_word.pdf";

const Profile = () => {
  const userStore = useContext(UserStore);
  const { profiles, getProfile, updateProfile, sending } = userStore;
  const [page, setPage] = useState("profile");
  const [edit, setEdit] = useState(false);
  useEffect(() => {
    getProfile();
  }, []);
  const handlePage = (data) => {
    if (page !== data) {
      setPage(data);
    }
  };
  const toggle = () => {
    setEdit(!edit);
  };
  return (
    <Fragment>
      <Card className="mt-2">
        <CardHeader>
          <h5>{page === "profile" ? "Profile Management" : "CEO STRORY"}</h5>

          {page === "profile" ? ( 
              <Button
                onClick={(e) => handlePage("story")}
                className="text-info"
              >
                Sign
              </Button>
           
          ) : (
            <Button
              onClick={(e) => handlePage("profile")}
              className="text-info"
            >
              Back to profile
            </Button>
          )}
        </CardHeader>
        <CardBody>
          <Row>
            {page === "profile" ? (
              <Col md="12" sm="12" className="mt-2">
                {edit ? (
                  <>
                    {" "}
                    <EditProfile
                      sending={sending}
                      submit={updateProfile}
                      edit={edit}
                      toggle={toggle}
                      initial_data={profiles}
                    />
                  </>
                ) : (
                  <>
                    {" "}
                    <ProfileDetails
                      edit={edit}
                      toggle={toggle}
                      data={profiles}
                    />
                  </>
                )}
              </Col>
            ) : (
              <Col md="12" sm="12" className="mt-2">
                <CEO_STORY
                  id={profiles && profiles.id}
                  signed={profiles && profiles.signed}
                  pdf={STORY} 
                />
              </Col>
            )}
          </Row>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default observer(Profile);
