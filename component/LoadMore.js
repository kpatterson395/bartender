const LoadMore = ({ resultingList, handleAdd, loading }) => {
  return (
    !!resultingList.length && (
      <div className="text-center">
        <button
          className="btn btn-primary mb-5"
          onClick={handleAdd}
          disabled={loading}
        >
          Get More Drinks
        </button>
      </div>
    )
  );
};

export default LoadMore;
