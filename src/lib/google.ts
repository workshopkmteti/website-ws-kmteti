import { Readable } from "node:stream";
import { google } from "googleapis";

function getGoogleAuth() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

  if (clientId && clientSecret && refreshToken) {
    const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);
    oauth2Client.setCredentials({ refresh_token: refreshToken });
    return oauth2Client;
  }

  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!email || !privateKey) {
    throw new Error(
      "Missing Google credentials (GOOGLE_CLIENT_ID/SECRET/REFRESH_TOKEN or Service Account)",
    );
  }

  return new google.auth.JWT({
    email,
    key: privateKey,
    scopes: [
      "https://www.googleapis.com/auth/drive",
      "https://www.googleapis.com/auth/spreadsheets",
    ],
  });
}

export async function uploadMaterialToDrive(params: {
  filename: string;
  mimeType: string;
  buffer: Buffer;
  folderId?: string;
}): Promise<{ fileId: string; webViewLink: string }> {
  const auth = getGoogleAuth();
  const drive = google.drive({ version: "v3", auth });
  const parentId = params.folderId ?? process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID;

  const response = await drive.files.create({
    requestBody: {
      name: params.filename,
      parents: parentId ? [parentId] : undefined,
    },
    media: {
      mimeType: params.mimeType,
      body: Readable.from(params.buffer),
    },
    fields: "id, webViewLink",
  });

  return {
    fileId: response.data.id ?? "",
    webViewLink: response.data.webViewLink ?? "",
  };
}

export async function exportBackupToSheets(params: {
  title: string;
  rows: string[][];
}): Promise<{ spreadsheetId: string; spreadsheetUrl: string }> {
  const auth = getGoogleAuth();
  const sheets = google.sheets({ version: "v4", auth });

  const created = await sheets.spreadsheets.create({
    requestBody: {
      properties: { title: params.title },
    },
  });

  const spreadsheetId = created.data.spreadsheetId ?? "";
  if (spreadsheetId && params.rows.length > 0) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: "Sheet1!A1",
      valueInputOption: "RAW",
      requestBody: { values: params.rows },
    });
  }

  return {
    spreadsheetId,
    spreadsheetUrl: created.data.spreadsheetUrl ?? "",
  };
}

export async function archiveBinaryFilesInDrive(params: {
  backupFolderName: string;
  fileIds: string[];
}): Promise<{ movedCount: number }> {
  const auth = getGoogleAuth();
  const drive = google.drive({ version: "v3", auth });
  const rootId = process.env.GOOGLE_DRIVE_ROOT_FOLDER_ID;

  const folder = await drive.files.create({
    requestBody: {
      name: params.backupFolderName,
      mimeType: "application/vnd.google-apps.folder",
      parents: rootId ? [rootId] : undefined,
    },
    fields: "id",
  });

  const targetFolderId = folder.data.id;
  if (!targetFolderId) return { movedCount: 0 };

  let movedCount = 0;
  for (const fileId of params.fileIds) {
    await drive.files.update({
      fileId,
      addParents: targetFolderId,
      fields: "id",
    });
    movedCount += 1;
  }

  return { movedCount };
}
