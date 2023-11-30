import React from "react";
import {
  BrightnessAltHigh,
  BrightnessLow,
  Fonts,
  BellFill,
  SunsetFill,
  Download,
} from "react-bootstrap-icons";
import { Container, Form, Button } from "react-bootstrap";

const ApplicationSettings = () => {
  return (
    <Container className="col-md-10 text-secondary">
      <div className="my-5 text-start mx-3">
        <h1>Settings</h1>
        <p>Change application settings according to your preferences.</p>
      </div>
      <hr />
      <div className="mx-3 mb-5 text-start">
        <form>
          <div className="mb-3 col-6 py-4">
            <Form.Label>
              <BrightnessAltHigh /> Brightness
            </Form.Label>
            <Form.Range className="range-control" />
          </div>
          <hr />
          <div className="mb-3 col-6 py-4">
            <Form.Label>
              <BrightnessLow /> Contrast
            </Form.Label>
            <Form.Range className="range-control" />
          </div>
          <hr />
          <div className="mb-3 col-6 py-4">
            <Form.Label>
              <Fonts />
              <Fonts className="fs-3" /> Font adjustment
            </Form.Label>
            <Form.Range className="range-control" />
          </div>
          <hr />
          <div className="mb-3 col-6 py-4">
            <Form.Label>
              <BellFill /> Notifications
            </Form.Label>

            <div className="d-flex flex-row col-3 justify-content-around">
              <span>Turn off</span>
              <Form.Switch className="switch-control" />
              <span>Turn on</span>
            </div>
          </div>
          <hr />
          <div className="mb-3 col-6 py-4">
            <Form.Label>
              <SunsetFill /> Automatic day and night mode
            </Form.Label>

            <div className="d-flex flex-row col-3 justify-content-around">
              <span>Turn off</span>
              <Form.Switch className="switch-control" />
              <span>Turn on</span>
            </div>
          </div>
          <hr />
          <Button type="submit" className="btn btn-success">
            Save settings <Download />
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default ApplicationSettings;
