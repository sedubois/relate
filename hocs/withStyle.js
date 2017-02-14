export default ComposedComponent => props => (
  <div>
    <ComposedComponent {...props} />
    <style jsx global>{`
      a {
        color: #02697C;
        text-decoration: none;
      }

      body {
        display: flex;
        flex-direction: column;
        font-family: Raleway, "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 16px;
        margin: 5px auto;
        max-width: 960px;
        min-height: 100%;
        padding: 0 16px;
      }

      p {
        font-size: 100%;
        line-height: 1.2;
      }
    `}</style>
  </div>
);
