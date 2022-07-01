export const generateStaticPaths = (data) => {
  return data.map((path) => {
    return {
      params: {
        id: path.id.toString(),
      },
    };
  });
};

export const generateStoreInfo = (data) => {
  return {
    address: data.location.formatted_address,
    neighbourhood: data.location.region,
  };
};
