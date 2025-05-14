"use client";

import { useEffect, useState } from "react";
import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

function ReactSwagger() {
  const [spec, setSpec] = useState(null);

  useEffect(() => {
    fetch("/api/docs", { credentials: "include" })
      .then((res) => res.json())
      .then(setSpec);
  }, []);

  if (!spec) return <p>Loading Swagger...</p>;

  return <SwaggerUI spec={spec} />;
}

export default ReactSwagger;
