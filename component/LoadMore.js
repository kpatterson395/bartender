const LoadMore = ({ resultingList, handleAdd, loading }) => {
  return (
    !!resultingList.length && (
      <div>
        <button
          className="btn btn-primary mb-5"
          onClick={handleAdd}
          disabled={loading}
        >
          {loading && (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          )}
          &nbsp; Get More Drinks
        </button>
      </div>
    )
  );
};

export default LoadMore;
