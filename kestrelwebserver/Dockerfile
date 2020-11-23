FROM mcr.microsoft.com/dotnet/core/aspnet:3.1

WORKDIR /app

ADD . /app

RUN dotnet restore

ENTRYPOINT ["dotnet", "run"]
