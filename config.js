module.exports = {
  upload_path: "/tmp",
  datastore_mongo: {
    host: "db",
    db_name: "sealious"
  },
  image_formats: {
    medium: {
      size: [300, 180]
    },
    small: {
      size: [100, 100]
    }
  },
  "www-server": {
    port: "8080"
  },
  smtp: {
    host: "example.com",
    port: 25,
    user: "any",
    password: "any"
  },
  email: {
    from_name: "Sealious test app",
    from_address: "sealious@example.com"
  },
  roles: ["admin"]
};
