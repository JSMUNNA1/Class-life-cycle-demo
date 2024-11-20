import React from "react";

class FormComponent extends React.Component {
  constructor(props) {
    super(props);
    // Initial state setup
    this.state = {
      name: "",
      email: "",
      submittedData: null,
      loading: false,
      hasError: false,
      error: null,
    };
    console.log("1. Constructor called");
  }

  // Lifecycle method for syncing props with state, if needed
  static getDerivedStateFromProps(props, state) {
    console.log("2. getDerivedStateFromProps called");
    // Return null if there's no state update necessary
    return null;
  }

  // Lifecycle method for side effects like data fetching
  componentDidMount() {
    console.log("4. componentDidMount called");
    // Example of data fetching simulation
    setTimeout(() => {
      console.log("Simulated data fetch completed");
    }, 1000);
  }

  // Determine if the component should re-render
  shouldComponentUpdate(nextProps, nextState) {
    console.log("5. shouldComponentUpdate called");
    // For this demo, always return true
    return true;
  }

  // Capture the DOM state before updates
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("7. getSnapshotBeforeUpdate called", prevProps, prevState);
    // Return null since there's nothing to snapshot in this case ,if it is runturn its gone componetDidUpdate in 3rd paramenter
    return null;
  }

  // Lifecycle method for updates
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("8. componentDidUpdate called", prevProps, prevState, snapshot);
  }

  // Cleanup before the component is unmounted
  componentWillUnmount() {
    console.log("9. componentWillUnmount called");
  }

  // Error boundary to catch rendering errors
  static getDerivedStateFromError(error) {
    console.log("Error boundary: getDerivedStateFromError", error);
    return { hasError: true }; // Update state to show fallback UI
  }

  componentDidCatch(error, errorInfo) {
    console.log("Error boundary: componentDidCatch", error, errorInfo);
  }

  // Handle form input changes
  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  // Handle form submission
  handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");

    this.setState({ loading: true });

    // Simulate an API call with a delay
    setTimeout(() => {
      const { name, email } = this.state;
      if (name && email) {
        // Update state with submitted data if valid
        this.setState({ submittedData: { name, email }, loading: false });
      } else {
        // Handle missing input fields
        this.setState({
          error: new Error("Name and Email are required!"),
          loading: false,
        });
      }
    }, 2000);
  };

  // Simulate an error for testing the error boundary
  throwError = () => {
    throw new Error("Simulated error for testing!");
  };

  render() {
    const { name, email, submittedData, loading, hasError, error } = this.state;

    if (hasError) {
      return <div>Something went wrong. Please try again later.</div>;
    }

    return (
      <div>
        <h1>Form Component with Lifecycle Methods</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={this.handleInputChange}
                />
              </label>
            </div>
            <div>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={this.handleInputChange}
                />
              </label>
            </div>
            <button type="submit">Submit</button>
            <button
              type="button"
              onClick={this.throwError}
              style={{ marginLeft: "10px" }}
            >
              Simulate Error
            </button>
          </form>
        )}

        {submittedData && (
          <div>
            <h2>Submitted Data:</h2>
            <p>Name: {submittedData.name}</p>
            <p>Email: {submittedData.email}</p>
          </div>
        )}

        {error && <p style={{ color: "red" }}>Error: {error.message}</p>}
      </div>
    );
  }
}

export default FormComponent;
