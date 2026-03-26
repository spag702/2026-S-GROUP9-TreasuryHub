'use client'

import { useState } from 'react'
import { uploadFile } from '../lib/files'

// Set the properties the component will use
type Props = {
    orgId: string
    transactionId?: string
    onSuccess: () => void
    onClose: () => void
}

// Component UploadModal
export default function UploadModal({ orgId, transactionId, onSuccess, onClose }: Props) {
    const [file, setFile] = useState<File | null>(null)
    const [fileType, setFileType] = useState<'receipt' | 'document'>('receipt')
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    async function handleUpload() {
        if (!file) return

        // Validate file size (10MB max)
        if (file.size > 10 * 1024 * 1024) {
            setError('File size must be under 10MB')
            return
        }

        // Validate file type
        // const allowed = ['application/pdf', 'image/jpeg', 'image/png']
        // if (!allowed.includes(file.type)) {
        //     setError('Only PDF, JPG, and PNG files are allowed')
        //     return
        // }
        const allowedReceipt = ['application/pdf', 'image/jpeg', 'image/png']

        const allowedDocument = [
            'application/pdf',
            'image/jpeg',
            'image/png',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        ]

        const allowed = fileType === 'receipt' ? allowedReceipt : allowedDocument
        if (!allowed.includes(file.type)) {
            setError(
                fileType === 'receipt'
                    ? 'Receipts must be PDF, JPG, or PNG'
                    : 'Documents must be PDF, JPG, PNG, DOCX, DOC, or XLSX'
            )
            return
        }

        setUploading(true)
        setError(null)

        try {
            await uploadFile(file, orgId, fileType, transactionId)
            onSuccess()
            onClose()
        } catch (err) {
            setError('Upload failed, please try again')
        } finally {
            setUploading(false)
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
                <h2 className="text-lg font-semibold mb-4">Upload File</h2>

                <div className="flex gap-4 mb-4">
                    <button
                        onClick={() => setFileType('receipt')}
                        className={`flex-1 py-2 rounded border ${fileType === 'receipt' ? 'bg-blue-600 text-white' : 'border-gray-300'}`}
                    >
                        Receipt
                    </button>
                    <button
                        onClick={() => setFileType('document')}
                        className={`flex-1 py-2 rounded border ${fileType === 'document' ? 'bg-blue-600 text-white' : 'border-gray-300'}`}
                    >
                        Document
                    </button>
                </div>

                <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                    className="w-full mb-4"
                />

                {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-2 rounded border border-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpload}
                        disabled={!file || uploading}
                        className="flex-1 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
                    >
                        {uploading ? 'Uploading...' : 'Upload'}
                    </button>
                </div>
            </div>
        </div>
    )
}