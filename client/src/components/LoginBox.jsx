import { useState } from "react";
import axios from "axios";
import shajs from "sha.js";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

const PasswordInput = ({ password, handlePassword }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        id="password"
        value={password}
        autoComplete="current-password"
        onChange={handlePassword}
        required
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2"
        onClick={() => setShowPassword((prev) => !prev)}
      >
        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export function LoginBox() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    const hashedPassword = shajs("sha256").update(password).digest("hex");

    try {
      const response = await axios({
        method: "post",
        url: "http://7d17dc13931b9d11.app.tourdeapp.cz/api/credentials/login",
        data: {
          loginName: username,
          password: hashedPassword,
        },
      });
      if (response.status !== 200 || !response.data.token) {
        throw new Error("Login failed");
      }
      const token = response.data.token;
      localStorage.setItem("token", token);
      window.location.href = "/admin";
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}
    >
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-xl">Přihlaste se a začněte vyučovat</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="loginName">Username</Label>
            <Input
              required
              id="loginName"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Heslo</Label>
            <PasswordInput password={password} handlePassword={(event) => setPassword(event.target.value)} />
          </div>
          <Button type="submit" className="w-full">
            Přihlásit
          </Button>
        </CardContent>
      </Card>
    </form>
  );
}
