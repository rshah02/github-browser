# # Dockerfile for dev-env
FROM node
EXPOSE 3000
ENV PORT=3000
COPY ./github-browser /github-browser
WORKDIR /github-browser
RUN npm install
# comment line below if you dont want webapp to start automatically when container is built
#ENTRYPOINT ["npm", "run", "start"]
