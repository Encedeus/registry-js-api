rm -rf ./src/proto
mkdir ./src/proto
protoc --plugin=node_modules/ts-proto/protoc-gen-ts_proto --ts_proto_out=./src/proto --ts_proto_opt=esModuleInterop=true ../plugin-server/protobuf/* -I=../plugin-server/protobuf
