# Github-browser

## DEV Setup
1. git clone
2. Make sure only following lines are uncommented in your Dockerfile
```
FROM node
EXPOSE 3000
ENV PORT=3000
COPY ./github-browser /github-browser
WORKDIR /github-browser
```
3. docker-compose up -d --build
4. docker exec it github-browser bash
5. npm run start


That's all
