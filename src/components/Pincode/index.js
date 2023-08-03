import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import Input from 'hometown-components/lib/Input';
import Div from 'hometown-components/lib/Div';
import * as actionCreators from 'redux/modules/pincode';

// const NO_RELOAD = ['/checkout/cart'];

const styles = require('./Pincode.scss');

const onChange = (dispatcher, load) => e => {
  const {
    target: { value }
  } = e;
  dispatcher(value);
  if (value.length >= 2) load(value);
};

const setPincodeInStore = (dispatcher, pincode, closeModal) => e => {
  e.preventDefault();
  closeModal();
  dispatcher(pincode);
  setTimeout(() => {
    window.location.reload();
  }, 1000);
};

const mapStateToProps = ({ pincode }) => ({
  ...pincode
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...actionCreators }, dispatch);

class Pincode extends React.Component {
  constructor(props) {
    super(props);
    this.pincodeinputref = React.createRef();
  }
  componentDidMount() {
    if (this.pincodeinputref.current) {
      this.pincodeinputref.current.focus();
    }
  }
  render() {
    const {
      setPincodeOrCityQuery,
      setPincode,
      pincodeQuery,
      load,
      loading,
      loaded,
      results,
      showResults,
      onCloseModal
    } = this.props;
    return (
      <Div className={styles.pincode} pt="0" pb="0.3125rem">
        <input
          type="text"
          placeholder="Enter Pincode / City"
          onChange={onChange(setPincodeOrCityQuery, load)}
          value={pincodeQuery}
          ref={this.pincodeinputref}
        />
        <Div className={`${styles.searchList} ${styles.active}`}>
          {loading && (
            <ul>
              <li> Searching.... </li>
            </ul>
          )}
          {loaded && showResults && results.length > 0 && (
            <ul>
              {results.map((item, index) => (
                <li key={String(index)}>
                  <button onClick={setPincodeInStore(setPincode, item.name, onCloseModal)}>{item.name}</button>
                </li>
              ))}
            </ul>
          )}
        </Div>
      </Div>
    );
  }
}

Pincode.defaultProps = {
  pincodeQuery: '',
  loading: false,
  loaded: false,
  results: [],
  showResults: false
};

Pincode.propTypes = {
  pincodeQuery: PropTypes.string,
  showResults: PropTypes.bool,
  loading: PropTypes.bool,
  loaded: PropTypes.bool,
  results: PropTypes.array,
  load: PropTypes.func.isRequired,
  setPincodeOrCityQuery: PropTypes.func.isRequired,
  setPincode: PropTypes.func.isRequired,
  onCloseModal: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pincode);
