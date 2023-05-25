# power-platform-pcf

## Step-by-Step Guide to Set Up PCF Component

Follow these steps to set up your PCF component:

1. **Clone the repository**:

    ```shell
    git clone https://github.com/ChrisMcKee1/power-platform-pcf.git
    ```

2. **Navigate to the cloned directory**:

    ```shell
    cd .\pcf\
    ```

3. **Install npm packages**:

    ```shell
    npm install
    ```

4. **Refresh the types**:

    ```shell
    npm run refreshTypes
    ```

5. **Build the project**:

    ```shell
    npm run build
    ```

6. **Create a directory for the PCF project**:

    ```shell
    mkdir PCF
    ```

7. **Navigate to the PCF directory**:

    ```shell
    cd .\PCF\
    ```

8. **Initialize the solution**:

    Replace `<replace>` with your publisher name and prefix.

    ```shell
    pac solution init --publisher-name <replace> --publisher-prefix <replace>
    ```

9. **Add a reference to the solution**:

    ```shell
    pac solution add-reference --path ..\..\
    ```

10. **Build the solution using .NET**:

    ```shell
    dotnet build
    ```

11. **Build the solution in Release configuration**:

    ```shell
    dotnet build --configuration Release
    ```

12. **List the Power Apps environments**:

    Make sure you are in the correct environment.

    ```shell
    pac auth list
    ```

13. **Import the solution to Power Apps**:

    ```shell
    pac solution import -p .\bin\Release\PCF.zip -pc
    ```
