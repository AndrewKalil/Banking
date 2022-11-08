import { Component } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";

class CustomScrollbars extends Component {
  render() {
    return (
      <Scrollbars
        // onScroll={this.handleScroll}
        // onScrollFrame={this.handleScrollFrame}
        // onScrollStart={this.handleScrollStart}
        // onScrollStop={this.handleScrollStop}
        // onUpdate={this.handleUpdate}
        // renderView={this.renderView}
        // renderTrackHorizontal={this.renderTrackHorizontal}
        // renderTrackVertical={this.renderTrackVertical}
        // renderThumbHorizontal={this.renderThumbHorizontal}
        // renderThumbVertical={this.renderThumbVertical}
        autoHide
        autoHideTimeout={1000}
        autoHideDuration={200}
        height={"100%"}
        thumbMinSize={30}
        universal={true}
        {...this.props}
      />
    );
  }
}
export default CustomScrollbars;
